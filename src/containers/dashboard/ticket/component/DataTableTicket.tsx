"use client";
import React, { useCallback, useRef, useState } from "react";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { useToast } from "@/libs/providers/toast-provider";
import { deleteCategory } from "@/actions/category.action";
import { TableHeader } from "@/components/shared/table/TableHeader";
import { formatDate } from "@/libs/helpers/parser";
import DataTableContext, {
  DataTableContextRef,
} from "@/components/shared/table/DataTableContext";
import { deleteTicket, getTickets } from "@/actions/ticket.action";
import { ITicket, TICKET_TYPES } from "@/types/ticket";
import { BsSendCheck } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AnswerTicketForm } from "./AnswerTicketForm";
import { ShowDetailTicketDialog } from "./ShowDetailTicketDialog";

type Props = {};

export function DataTableTicket({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenAnswerForm, setIsOpenAnswerForm] = useState(false);

  const tableRef = useRef<DataTableContextRef>(null);

  const [dataSelected, setDataSelected] = useState<ITicket | null>(null);
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

  const columns: ColumnsType<ITicket> = [
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phản hồi",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Phân loại",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => {
        return TICKET_TYPES.filter((tag) => tag.value === type).map(
          (item, idx) => (
            <Tag key={idx} color={item.color}>
              {item.label}
            </Tag>
          )
        );
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
          <Tooltip
            placement="leftTop"
            color={"info"}
            key={"info"}
            title="Trả lời"
          >
            <Button
              onClick={() => {
                setIsOpenAnswerForm(true);
                setDataSelected(record);
              }}
              icon={<BsSendCheck />}
            ></Button>
          </Tooltip>
          <Tooltip
            placement="leftTop"
            color={"info"}
            key={"info"}
            title="Xem chi tiết"
          >
            <Button
              onClick={() => {
                setIsOpenDialogForm(true);
                setDataSelected(record);
              }}
              icon={<MdOutlineRemoveRedEye />}
            ></Button>
          </Tooltip>
          {/* <Button
            onClick={() => {
              setIsOpenDialogForm(true);
              setDataSelected(record);
            }}
            icon={<BiPencil />}
          ></Button> */}
          <Popconfirm
            title="Xoá ticket "
            description="Bạn chắc chắn muốn xoá ticket này?"
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

  const handleDeleteItem = useCallback(
    async ({ idDelete }: { idDelete: string }) => {
      if (idDelete) {
        const res = await deleteTicket(idDelete);
        if (res && res.success) {
          toast.success("Xoá ticket thành công");
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
        label="Ticket"
        onCreate={() => {
          setDataSelected(null);
          setIsOpenDialogForm(true);
        }}
        isVisibleCreate={false}
      />

      <DataTableContext<ITicket>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getTickets}
        rowSelection={rowSelection}
      />
      <AnswerTicketForm
        open={isOpenAnswerForm}
        onCancel={() => setIsOpenAnswerForm(false)}
        updateValue={dataSelected}
        onRefetchingTable={handleReload}
      />
      <ShowDetailTicketDialog
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        detailItem={dataSelected}
      />
    </>
  );
}
