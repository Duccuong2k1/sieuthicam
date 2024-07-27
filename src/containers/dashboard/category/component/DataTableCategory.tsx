"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Button, Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { CreateUpdateCategoryForm } from "./CreateUpdateCategoryForm";

import { ColumnTitleProps } from "antd/es/table/interface";
import { useToast } from "@/libs/providers/toast-provider";
import { ICategory } from "@/types/category";
import { deleteCategory, getCategories } from "@/actions/category.action";
import { TableHeader } from "@/components/shared/table/TableHeader";
import { formatDate } from "@/libs/helpers/parser";
import DataTableContext, {
  DataTableContextRef,
} from "@/components/shared/table/DataTableContext";

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  email: string;
  tags: string[];
}
type ColumnTitle<T> = (
  props: ColumnTitleProps<T> | ColumnTitleProps<ICategory>
) => ReactNode;
type Props = {};

export function DataTableCategory({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useRef<DataTableContextRef>(null);

  const [dataSelected, setDataSelected] = useState<ICategory | null>(null);
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

  const columns: ColumnsType<ICategory> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
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
            title="Xoá danh mục "
            description="Bạn chắc chắn muốn xoá danh mục này?"
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
        const res = await deleteCategory(idDelete);
        if (res && res.success) {
          toast.success("Xoá danh mục thành công");
          handleReload();
        }
      }
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (tableRef.current) {
        setIsLoading(tableRef.current.isLoading);
      }
    }, 100); // Adjust the interval as needed
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TableHeader
        isLoading={isLoading}
        handleRefetch={handleReload}
        label="danh mục"
        onCreate={() => {
          setDataSelected(null);
          setIsOpenDialogForm(true);
        }}
      />

     
      <DataTableContext<ICategory>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getCategories}
        rowSelection={rowSelection}
      />
      <CreateUpdateCategoryForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        updateValue={dataSelected}
        onRefetchingTable={handleReload}
      />
    </>
  );
}
