import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Custom styles to match the previous react-day-picker appearance
const customStyles = `
  .react-datepicker {
    border: none !important;
    background-color: transparent !important;
    font-family: inherit !important;
  }
  
  .react-datepicker__month-container {
    width: 100%;
  }
  
  .react-datepicker__header {
    background-color: transparent !important;
    border-bottom: none !important;
  }
  
  .react-datepicker__day-name {
    margin: 0.3rem !important;
    width: 2rem !important;
    line-height: 2rem !important;
  }
  
  .react-datepicker__day {
    margin: 0.2rem !important;
    width: 2rem !important;
    height: 2rem !important;
    line-height: 2rem !important;
    border-radius: 0.375rem !important;
  }
  
  .react-datepicker__day--selected {
    background-color: hsl(var(--primary)) !important;
    color: hsl(var(--primary-foreground)) !important;
  }
  
  .react-datepicker__day--today {
    background-color: hsl(var(--accent)) !important;
    color: hsl(var(--accent-foreground)) !important;
    font-weight: normal !important;
  }
  
  .react-datepicker__day--disabled {
    color: hsl(var(--muted-foreground)) !important;
    opacity: 0.5 !important;
  }
  
  .react-datepicker__day--outside-month {
    color: hsl(var(--muted-foreground)) !important;
  }
  
  .react-datepicker__day:hover {
    background-color: hsl(var(--accent)) !important;
  }
  
  .react-datepicker__day--selected:hover {
    background-color: hsl(var(--primary)) !important;
  }
  
  .react-datepicker__triangle {
    display: none !important;
  }
`

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | null) => void
  onChange?: (date: Date | null) => void
  className?: string
  showOutsideDays?: boolean
  mode?: "single" | "range" | "multiple"
  [key: string]: any
}

function Calendar({
  selected,
  onSelect,
  onChange,
  className,
  showOutsideDays = true,
  mode = "single",
  ...props
}: CalendarProps) {
  const handleChange = (date: Date | null) => {
    if (onChange) onChange(date);
    if (onSelect) onSelect(date);
  };

  return (
    <div className={cn("p-3", className)}>
      <style>{customStyles}</style>
      <DatePicker
        selected={selected}
        onChange={handleChange}
        inline
        calendarClassName="w-full"
        dayClassName={() => "text-center"}
        weekDayClassName={() => "text-muted-foreground font-normal text-[0.8rem]"}
        monthClassName={() => "flex flex-col gap-4"}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-center pt-1 relative items-center w-full">
            <div className="text-sm font-medium">
              {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1 absolute right-1">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-30"
                )}
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-30"
                )}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
        {...props}
      />
    </div>
  )
}

export { Calendar }
