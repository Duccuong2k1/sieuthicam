"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Button, Dropdown, MenuProps, Popconfirm, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { DownOutlined } from '@ant-design/icons';
import { useToast } from "@/libs/providers/toast-provider";

import { TableHeader } from "@/components/shared/table/TableHeader";
import { formatDate, parseNumber } from "@/libs/helpers/parser";
import DataTableContext, {
  DataTableContextRef,
} from "@/components/shared/table/DataTableContext";
import { ICoupon } from "@/types/coupon";

import { deleteCoupon, getCoupons } from "@/actions/coupon.action";
import { IOrder, STATUS_ORDER } from "@/types/order";
import { deleteOrder, getOrdersByAdmin, updateStatusOrder } from "@/actions/order.action";
import { CreateUpdateOrderForm } from "./CreateUpdateOrderForm";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ShowDetailOrderDialog } from "./ShowDetailOrderDialog";


type Props = {};

export function DataTableOrder({ }: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false);

  const tableRef = useRef<DataTableContextRef>(null);

  const [dataSelected, setDataSelected] = useState<IOrder | null>(null);
  const toast = useToast();



  const handleReload = () => {
    tableRef.current?.reloadTable();
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (dataSelected?._id) {
      if (dataSelected.status === "Shipped") {
        toast.error("Không thể thay đổi trạng thái của đơn hàng đã giao hàng.");
        return;
      }
      try {
        await updateStatusOrder(dataSelected?._id, e.key);
        toast.success("Cập nhật trạng thái đơn thành công");
        handleReload();
      } catch (err) {
        console.log("err update status", err);
        toast.error("Cập nhật trạng thái đơn thất bại");
      }
    }
  };


  const items: MenuProps['items'] = STATUS_ORDER.map((status, index) => ({
    label: status.label,
    key: status.value,
    style: { color: status.color }
  }));

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const columns: ColumnsType<IOrder> = [
    {
      title: "Mã đơn",
      dataIndex: "code",
      key: "code",

    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => +a.createdAt - +b.createdAt,
      render: (_, { createdAt }) => {
        return <div>{formatDate(createdAt, "dd/MM/yyyy HH:mm")}</div>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total,
      render: (_, { total }) => {
        return <div>{parseNumber(total, "VND")}</div>;
      },

    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          {STATUS_ORDER.filter((item) => item.value === status).map((item) => (
            <Tag color={item.color} key={item.value}>
              {item.label.toLocaleUpperCase()}
            </Tag>
          ))}
        </>
      ),

    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">

          <Dropdown menu={menuProps} trigger={["click"]} onOpenChange={() => setDataSelected(record)}>
            <Button>
              <Space>
                Cập nhật đơn hàng
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Button
            onClick={() => {
              setDataSelected(record);
              setIsOpenDetailDialog(true)
            }}
            icon={<MdOutlineRemoveRedEye />}
          ></Button>
          <Popconfirm
            title="Xoá Đơn hàng "
            description="Bạn chắc chắn muốn xoá Đơn hàng này?"
            icon={<QuestionCircleOutlined />}
            onConfirm={() => {
              if (record._id) {
                handleDeleteItem({ idDelete: record._id });
              }
            }}
            // color="volcano"
            okButtonProps={{ danger: true }}
            okText="Xác nhận"
          >
            <Button danger icon={<RiDeleteBin6Line />} className="" />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  console.log("data selected", dataSelected)
  const handleDeleteItem = useCallback(
    async ({ idDelete }: { idDelete: string }) => {
      if (idDelete) {
        const res = await deleteOrder(idDelete);
        if (res && res.success) {
          toast.success("Xoá Đơn hàng thành công");
          handleReload();
        }
      }
    },
    []
  );



  return (
    <>
      <TableHeader

        handleRefetch={handleReload}
        label="Đơn hàng"
        onCreate={() => {
          setDataSelected(null);
          setIsOpenDialogForm(true);
        }}
      />


      <DataTableContext<IOrder>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getOrdersByAdmin}
        rowSelection={rowSelection}
      />
      <CreateUpdateOrderForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        updateValue={dataSelected}
        onRefetchingTable={handleReload}
      />

      <ShowDetailOrderDialog
        open={isOpenDetailDialog}
        onCancel={()=> setIsOpenDetailDialog(false)}
        detailItem={dataSelected}
      />
    </>
  );
}
