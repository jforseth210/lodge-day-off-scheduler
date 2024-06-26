import { Button, Modal } from "react-bootstrap";
import { useApplicationState } from "./ApplicationContext";
import { Group, Weekday } from "./Models";
interface GroupModalProps {
  group: Group | null;
  handleClose: () => void;
}
export const GroupModal: React.FC<GroupModalProps> = ({ group, handleClose }) => {
  const state = useApplicationState()!;
  if (group == null) { return (<></>); }
  if (state.scheduleGenerated === false) { return <></> }
  const days = []
  for (const day of group.getDays()) {
    days.push(
      <div className="flex-fill card p-2 m-2">
        <h4>{day}</h4>
        <hr className="mt-0" />
        <ul>
          {group.getCounselorsOn(Weekday[day as keyof typeof Weekday])?.map(counselor => <li>{counselor.getName()}</li>)}
        </ul>
      </div>
    );
  }
  return (

    <Modal show={group != null} onHide={() => handleClose()} size="lg">
      {group != null &&
        <>
          <Modal.Header closeButton>
            <Modal.Title>{group.getName()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Daily available group members:</p>
            <div className="d-flex w-100">{days}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
          </Modal.Footer>
        </>
      }
    </Modal>);
}
