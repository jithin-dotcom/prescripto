

// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment } from "react";
// import { X } from "lucide-react";

// interface ConfirmModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title?: string;
//   description?: string;
//   confirmText?: string;
//   cancelText?: string;
// }

// const ConfirmModal: React.FC<ConfirmModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title = "Are you sure?",
//   description = "This action cannot be undone.",
//   confirmText = "Confirm",
//   cancelText = "Cancel",
// }) => {
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         {/* BACKDROP */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300" leave="ease-in duration-200"
//           enterFrom="opacity-0" enterTo="opacity-100"
//           leaveFrom="opacity-100" leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/30" />
//         </Transition.Child>

//         {/* MODAL PANEL */}
//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
            
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300" leave="ease-in duration-200"
//               enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
//               leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                
//                 <div className="flex justify-between items-start mb-3">
//                   <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
//                     {title}
//                   </Dialog.Title>
//                   <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="mt-2 text-sm text-gray-600">
//                   {description}
//                 </div>

//                 <div className="mt-6 flex justify-end gap-3">
//                   <button
//                     type="button"
//                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
//                     onClick={onClose}
//                   >
//                     {cancelText}
//                   </button>
//                   <button
//                     type="button"
//                     className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
//                     onClick={() => {
//                       onConfirm();
//                       onClose();
//                     }}
//                   >
//                     {confirmText}
//                   </button>
//                 </div>

//               </Dialog.Panel>
//             </Transition.Child>

//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default ConfirmModal;





import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* BACKDROP */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        {/* MODAL PANEL */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              leave="ease-in duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-3">
                  <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                    {title}
                  </DialogTitle>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-2 text-sm text-gray-600">{description}</div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                  >
                    {confirmText}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
