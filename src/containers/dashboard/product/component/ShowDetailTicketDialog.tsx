import { useMemo } from "react";

import { useToast } from "@/libs/providers/toast-provider";
import { Form, Input, Modal, Radio } from "antd";

import { ICategory } from "@/types/category";
import { createCategory, updateCategory } from "@/actions/category.action";
import { ITicket } from "@/types/ticket";
import { IProduct } from "@/types/product";

interface Values {
  title: string;
  description: string;
  modifier: string;
}
interface CollectionCreateFormProps {
  open: boolean;
  onCancel: () => void;
  detailItem: IProduct | null;
}

export function ShowDetailTicketDialog({
  open,
  detailItem,
  onCancel,
}: CollectionCreateFormProps) {
  return (
    <Modal
      open={open}
      title={`Chi tiết thông tin`}
      okButtonProps={{
        style: {
          background: "#1a94c4",
        },
      }}
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
      }}
      onOk={() => {
        onCancel();
      }}
    >
      <div className="">
        <div className="flex flex-row items-center justify-start gap-1 w-full">
          {" "}
          <div className="font-bold">Mô tả:</div> {detailItem?.description}
        </div>
        
      </div>
    </Modal>
  );
}
