import React from "react";

import { Spin } from "antd";
type Props = {};

export function Spinner({}: Props) {
  return (
    <Spin tip="Loading" className="mt-10 flex flex-col justify-center items-center">
      <div className="content" />
    </Spin>
  );
}
