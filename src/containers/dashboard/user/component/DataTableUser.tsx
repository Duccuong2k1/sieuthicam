"use client";
import React, { ReactNode, useCallback, useId, useRef, useState } from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { CreateUpdateUserForm } from "./CreateUpdateUserForm";
import { IUser, USER_ROLES } from "@/types/user";
import { ColumnTitleProps } from "antd/es/table/interface";
import { deleteUser, getUserList } from "@/actions/user.action";
import { useToast } from "@/libs/providers/toast-provider";
import { TableHeader } from "@/components/shared/table/TableHeader";
import { formatDate } from "@/libs/helpers/parser";

import DataTableContext, {
  DataTableContextRef,
} from "@/components/shared/table/DataTableContext";
import { TableFilterHeader } from "@/components/shared/table/TableFilterHeader";

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  email: string;
  tags: string[];
}
type ColumnTitle<T> = (
  props: ColumnTitleProps<T> | ColumnTitleProps<IUser>
) => ReactNode;
type Props = {};

export function DataTableUser({ }: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userSelected, setUserSelected] = useState<IUser | null>(null);
  const id = useId();
  const toast = useToast();

  const tableRef = useRef<DataTableContextRef>(null);

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

  const columns: ColumnsType<IUser> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, { firstName, lastName }) => {
        return (
          <div>
            {firstName} {lastName}
          </div>
        );
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
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
      title: "Vai trò",
      key: "role",
      dataIndex: "role",
      render: (_, { role }) => (
        <>
          {USER_ROLES.filter((item) => item === role).map((item) => (
            <Tag color={item === "admin" ? "green" : "geekblue"} key={role}>
              {item.toLocaleUpperCase()}
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
          <Button
            onClick={() => {
              setIsOpenDialogForm(true);
              setUserSelected(record);
            }}
            icon={<BiPencil />}
          ></Button>
          <Popconfirm
            title="Xoá tài khoản "
            description="Bạn chắc chắn muốn xoá tài khoản này?"
            icon={<QuestionCircleOutlined />}
            onConfirm={() => {
              if (record._id) {
                handleDeleteItem({ idDelete: record._id });
              }
            }}
            // color="volcano"
            disabled={record.role === "admin"}
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
        const res = await deleteUser(idDelete);
        if (res && res.success) {
          toast.success("Xoá tài khoản thành công");
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
        label=" tài khoản"
        onCreate={() => {
          setUserSelected(null);
          setIsOpenDialogForm(true);
        }}
      />
      <DataTableContext<IUser>
        textPlaceholder="Tìm kiếm theo email hoặc tên của bạn..."
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getUserList}
        rowSelection={rowSelection}
      />

      <CreateUpdateUserForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        updateValueUser={userSelected}
        onRefetchingTable={handleReload}
      />
    </>
  );
}
