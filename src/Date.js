import { format } from "date-fns";

const Datetime = ({ date }) => {
  var formattedDate = format(new Date(date), 'do MMMM');
  return formattedDate;
}

export default Datetime;