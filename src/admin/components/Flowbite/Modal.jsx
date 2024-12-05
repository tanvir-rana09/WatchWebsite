import { Modal } from "antd";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Button from "../Buttons/Button";
export function FlowbiteModal({ openModal, setOpenModal, onClick,loading }) {

  return (
    <div className="z-[999999999999]">
      <Modal className="z-[9999999999] " show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal/>
        <Modal>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
              <Button variant="danger" loading={loading} onClick={onClick}>
                {"Yes, I'm sure"}
              </Button>
            </div>
          </div>
        </Modal>
      </Modal>
    </div>
  );
}
