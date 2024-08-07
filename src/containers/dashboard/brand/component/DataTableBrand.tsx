"use client";
import React, {  useCallback, useRef, useState } from "react";
import { Button, Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";
import { QuestionCircleOutlined } from "@ant-design/icons";


import { useToast } from "@/libs/providers/toast-provider";

import { IBrand, ICategory } from "@/types/category";
import { TableHeader } from "@/components/shared/table/TableHeader";
import { formatDate } from "@/libs/helpers/parser";

import { CreateUpdateBrandForm } from "./CreateUpdateBrandForm";
import { deleteBrand, getBrands } from "@/actions/brand.action";
import DataTableContext, {
  DataTableContextRef,
} from "@/components/shared/table/DataTableContext";


interface Props {}

export function DataTableBrand({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [dataSelected, setDataSelected] = useState<IBrand | null>(null);
  const toast = useToast();
  const tableRef = useRef<DataTableContextRef>(null);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IBrand> = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (_, { category }) => {
        return <div>{category?.title}</div>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => {
        return <div>{formatDate(createdAt, "dd/MM/yyyy")}</div>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            onClick={() => {
              setIsOpenDialogForm(true);
              setDataSelected(record);
            }}
            icon={<BiPencil />}
          ></Button>
          <Popconfirm
            title="Xoá brand "
            description="Bạn chắc chắn muốn xoá brand này?"
            icon={<QuestionCircleOutlined />}
            onConfirm={() => handleDeleteItem({ idDelete: record._id })}
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

  const handleDeleteItem = useCallback(
    async ({ idDelete }: { idDelete: string }) => {
      if (idDelete) {
        const res = await deleteBrand(idDelete);
        if (res && res.success) {
          toast.success("Xoá brand thành công");
          handleReload();
        }
      }
    },
    []
  );
  const handleReload = () => {
    tableRef.current?.reloadTable();
  };

  return (
    <>
      <TableHeader
        handleRefetch={handleReload}
        label="Loại hình"
        onCreate={() => {
          setDataSelected(null);
          setIsOpenDialogForm(true);
        }}
      />

      <DataTableContext<IBrand>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getBrands}
        rowSelection={rowSelection}
      />
      <CreateUpdateBrandForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        updateValue={dataSelected}
        onRefetchingTable={handleReload}
      />
    </>
  );
}
