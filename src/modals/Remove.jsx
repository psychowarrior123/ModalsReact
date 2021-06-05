import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';

const Remove = ({ onSubmit, onClose }) => (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Remove</Modal.Title>
        <button className="close" type="button" onClick={onClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
      </Modal.Header>
      <div className="modal-body">
        <form onSubmit={onSubmit}>
          <FormGroup>
            <input className="btn btn-danger" type="submit" value="Remove" />
          </FormGroup>
        </form>
      </div>
    </Modal.Dialog>
  );

export default Remove;