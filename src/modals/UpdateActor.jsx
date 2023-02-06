import React from "react";
import { useState } from "react";
import { updateActor } from "../api/actor";
import ActorForm from "../components/form/ActorForm";
import { useNotification } from "../hooks";
import ModalContainer from "./ModalContainer";

export default function UpdateActor({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await updateActor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    onSuccess(actor);
    updateNotification("success", "Actor updated successfully");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Actor"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}
