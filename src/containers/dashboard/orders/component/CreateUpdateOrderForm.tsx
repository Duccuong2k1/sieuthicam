import { useMemo } from "react";

import { Form, Input, Modal, Radio } from "antd";
import { IOrder } from "@/types/order";
import { useToast } from "@/libs/providers/toast-provider";

interface CollectionCreateFormProps {
  open: boolean;
  onCancel: () => void;
  updateValue: IOrder | null;
  onRefetchingTable: () => void;
}

export function CreateUpdateOrderForm({
  open,
  updateValue,
  onCancel,
  onRefetchingTable,
}: CollectionCreateFormProps) {
  const [form] = Form.useForm();
  const toast = useToast();

  const labelForm = useMemo(() => {
    return updateValue ? "Cập nhật" : "Tạo";
  }, [updateValue]);

  const onCreate = async (values: any) => {
    console.log(values, "value");
    // if (updateValue) {
    //   try {
    //     const res = await updateCoupon(updateValue._id,values);
    //     if (res && res.success) {
    //       toast.success("Cập nhật khuyến mãi thành công");
    //       onCancel();
    //       onRefetchingTable();
    //     }
    //   } catch (err) {
    //     toast.error("Cập nhật khuyến mãi thất bai");
    //     console.log("error create user", err);
    //   }
    // } else {
    //   try {
    //     const res = await createCoupon(values);
    //     if (res && res.success) {
    //       toast.success("Tạo khuyến mãi thành công");
    //       onCancel();
    //       onRefetchingTable();
    //     }
    //   } catch (err) {
    //     toast.error("Tạo khuyến mãi thất bai");
    //     console.log("error create user", err);
    //   }
    // }
  };
  const resetFieldForm = () => {
    return {
      title: "",
      code: "",
      discount: "",
      expiry: "",
    };
  };

  return (
    <Modal
      open={open}
      title={`${labelForm} khuyến mãi`}
      okText={`${labelForm}`}
      okButtonProps={{
        style: {
          background: "#1a94c4",
        },
      }}
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        resetFieldForm();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      afterOpenChange={(open) => {
        if (open) {
          form.setFieldsValue(updateValue || resetFieldForm());
        }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={updateValue || resetFieldForm()}
      >
        {updateValue && (
          <Form.Item
            name="code"
            label="Mã code"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="discount"
          label="Giảm giá"
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống ",
            },
          ]}
        >
          <Input placeholder="vd: 10%" />
        </Form.Item>
        <Form.Item
          name="expiry"
          label="Thời hạn hết hạn"
          rules={[
            {
              required: true,
              message: "Vui lòng không để trống ",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
