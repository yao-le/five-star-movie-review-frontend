import React from "react";
import { useState } from "react";
import { createActor } from "../api/actor";
import ActorForm from "../components/form/ActorForm";
import { useNotification } from "../hooks";
import ModalContainer from "./ModalContainer";

export default function ActorUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await createActor(data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Actor created successfully");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Create New Actor"
        btnTitle="Create"
        busy={busy}
      />
    </ModalContainer>
  );
}