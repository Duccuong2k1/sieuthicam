"use client";
import { Transition, Dialog } from "@headlessui/react";
import React, { ReactNode, useEffect } from "react";
import { Fragment, useState } from "react";
import { forceCheck } from "react-lazyload";
import { Button } from "../form/Button";
import { IoClose } from "react-icons/io5";
import { useScreen } from "@/app/libs/hooks/useScreen";

export interface DialogComponentProps {
  children?: ReactNode; // Use ReactNode type for children
  as?: string;
  className?: string;
  onClose: () => any;
  title?: string;
  isOpen: boolean;
  labelClose?: string;
  typeBtn?: "button" | "submit";
  isFooter?: boolean;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  mobileSizeMode?: boolean;
  slideFromBottom?: "none" | "mobile-only" | "all";
  style?: any;
  dialogBodyClass?: any;
  isOverlayClick?: boolean;
  isBtnClose?: boolean;
}

export function DialogModal({
  typeBtn = "button",
  children,
  as,
  className,
  title,
  isOpen: initialIsOpen,
  isFooter = false,
  slideFromBottom = "mobile-only",
  width = "auto",
  mobileSizeMode = false,
  maxWidth = "86vw",
  minWidth = undefined,
  dialogBodyClass = "",
  isOverlayClick = false,
  isBtnClose = true,
  ...props
}: DialogComponentProps) {
  let [isOpen, setIsOpen] = useState(initialIsOpen);
  const isMobile = useScreen("sm");
  useEffect(() => {
    let timeout: any;
    if (initialIsOpen) {
      setIsOpen(initialIsOpen);
      setTimeout(() => forceCheck(), 100);
    } else {
      timeout = setTimeout(() => {
        setIsOpen(initialIsOpen);
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [initialIsOpen]);
  const isSlideFromBottom =
    (slideFromBottom == "mobile-only" && isMobile) || slideFromBottom == "all";
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={
            isOverlayClick
              ? () => {
                  return isOverlayClick;
                }
              : (props.onClose as any)
          }
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25 bg-primary-light" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full transform overflow-hidden rounded bg-black p-4 text-left align-middle shadow-xl transition-all ${className}`}
                  style={{
                    width,
                    maxWidth:
                      mobileSizeMode || isSlideFromBottom
                        ? undefined
                        : maxWidth,
                    minWidth: minWidth,
                    ...props.style,
                  }}
                >
                  {isBtnClose && (
                    <div className="flex flex-col items-end justify-end">
                      <Button
                        icon={<IoClose />}
                        iconPosition="start"
                        className={"border-none px-0 text-white"}
                        onClick={props.onClose}
                      />
                    </div>
                  )}
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center"
                  >
                    {title}
                  </Dialog.Title>
                  <div className={`mt-2 w-full ${dialogBodyClass}`}>
                    {children}
                  </div>
                  {isFooter && (
                    <div className="flex items-end justify-end mt-4">
                      <button
                        type={typeBtn}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 border border-transparent rounded-md bg-primary hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={props.onClose as any}
                      >
                        {props.labelClose}
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
