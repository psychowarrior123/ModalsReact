import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

const Add = ({ onSubmit, onClose }) => {
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      onSubmit(values.body);
    },
  });
  const input = useRef(null);
  useEffect(() => {
    input.current.focus();
  });

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Add</Modal.Title>
        <button className="close" type="button" onClick={onClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              data-testid="input-body"
              name="body"
              required
              value={formik.values.body}
              onChange={formik.handleChange}
              ref={input}
            />
          </FormGroup>
          <input
            className="btn btn-primary"
            type="submit"
            value="submit"
          />
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default Add;