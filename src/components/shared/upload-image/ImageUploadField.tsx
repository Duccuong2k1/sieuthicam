import React, { useState } from 'react';
import { Upload, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useToast } from '@/libs/providers/toast-provider';

interface UploadImageProps {
  fileList: any[];
  setFileList: (fileList: any[]) => void;
  multiple?: boolean;
}

const ImageUploadField: React.FC<UploadImageProps> = ({ fileList, setFileList, multiple = false }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const toast = useToast()

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList }: { fileList: any[] }) => setFileList(fileList);

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      toast.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
        multiple={multiple}
      >
        {fileList.length >= (multiple ? 10 : 1) ? null : (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>{multiple ? 'Chọn ảnh sản phẩm' : 'Chọn ảnh đại diện'}</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        {
          previewImage && (
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          )
        }
      </Modal>
    </>
  );
};

export default ImageUploadField;
