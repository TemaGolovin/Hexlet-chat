import { Button, ButtonGroup, Dropdown, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Channel = ({ isActive, channel }) => {
  const { t } = useTranslation();

  return (
    <Nav.Item className="w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            className="w-100 rounded-0 text-start text-truncate"
            variant={isActive ? "secondary" : null}
          >
            <span>#</span>
          </Button>

          <Dropdown.Toggle
            split
            variant={isActive ? "secondary" : null}
            className="flex-grow-0"
            id="dropdown-split-basic"
          >
            <span className="visually-hidden">{t("modal.toggle")}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>{t("modal.rename")}</Dropdown.Item>
            <Dropdown.Item>{t("modal.remove")}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          className="w-100 rounded-0 text-start"
          variant={isActive ? "secondary" : null}
        >
          <span>#</span> {channel.name}
        </Button>
      )}
    </Nav.Item>
  );
};

export default Channel;
