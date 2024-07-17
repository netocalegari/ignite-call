import { useState } from "react";

import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  const handleClearSeletedDateTime = () => {
    setSelectedDateTime(null);
  };

  if (selectedDateTime)
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelConfirmation={handleClearSeletedDateTime}
      />
    );

  return <CalendarStep onSelectDatetime={setSelectedDateTime} />;
}
