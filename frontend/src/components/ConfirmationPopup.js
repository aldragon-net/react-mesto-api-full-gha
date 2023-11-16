import PopupWithForm from './PopupWithForm';

function ConfirmationPopup ({isOpen, onConfirm, isUpdating, onClose}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  }

  return ( 
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      buttonText={isUpdating ? "Удаляется…" : "Да"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose} />
  )
}

export default ConfirmationPopup;