import React from "react";

type Props = {};

const Modal = (props: Props) => {
  return (
    <div
      className="modal fade custom-modal"
      id="quickViewModal"
      tabIndex={-1}
      aria-labelledby="quickViewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
