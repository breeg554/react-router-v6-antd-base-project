import { Typography } from "antd";
import { Link } from "react-router-dom";
interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className="not-found-wrapper">
      <Typography.Title>404.</Typography.Title>
      <Typography.Title level={3}>Nie ma takiej strony</Typography.Title>
      <Typography.Text>
        Wróć na <Link to="/">stronę główną</Link>
      </Typography.Text>
    </div>
  );
};
