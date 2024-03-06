import React, { forwardRef, PropsWithChildren, useEffect } from "react";

const ModalWrapper = forwardRef(
  ({ children }: PropsWithChildren, dialogRef) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          event.target instanceof Element &&
          event.target.nodeName === "DIALOG"
        ) {
          (dialog as any).close();
        }
      };

      const dialog = (dialogRef as any).current;
      if (dialog) {
        dialog.addEventListener("click", handleClickOutside);
      }

      return () => {
        if (dialog) {
          dialog.removeEventListener("click", handleClickOutside);
        }
      };
    }, [dialogRef]);

    return (
      <dialog
        style={{
          width: "calc(100% - 32px)",
          maxWidth: "960px",
          backgroundColor: "transparent",
          border: "none",
        }}
        ref={dialogRef as any}
      >
        {children}
      </dialog>
    );
  }
);

ModalWrapper.displayName = "ModalWrapper";

export default ModalWrapper;
