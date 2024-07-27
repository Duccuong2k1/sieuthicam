import { Modal, Spin } from 'antd';
import React from 'react';

type OverlayLoadingModalProps = {
    isOpen: boolean;
    label?: string
};

export function OverlayLoadingModal({ isOpen, label }: OverlayLoadingModalProps) {
    return (
        <Modal centered width={300} open={isOpen} footer={null} closable={false}>
            <div style={{ textAlign: 'center' }}>
                <div className='font-medium mb-2 text-lg'>Đang tiến hành {label}</div>
                <div>
                    <Spin size='large' />
                    <p className='my-2'>Vui lòng đợi trong giây lát ...</p>
                </div>
            </div>
        </Modal>
    );
}
