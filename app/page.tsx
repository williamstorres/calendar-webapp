export const dynamic = "force-dynamic";

import Calendar from "./components/Calendar";
import { Modal } from "./components/UI/Modal";

export default function Home() {
  return (
    <>
      <Calendar />
      <Modal />
    </>
  );
}
