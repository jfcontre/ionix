import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

interface Props {
  onSelectDate: (dateSelected: Date | undefined) => void
  dateValue: Date | undefined
}
export const DatePicker = ({ onSelectDate, dateValue }: Props) => {
  const [date, setDate] = useState<Date | undefined>(dateValue)

  const handleSelect = (date: Date | undefined) => {
    if (date === undefined) return
    setDate(date)
    if (onSelectDate) {
      onSelectDate(date)
    }
  }

  return <Popover>
    <PopoverTrigger asChild style={{ width: '100%' }}>
      <Button
        variant={"outline"}
        className={cn(
          "w-[280px] justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        initialFocus
      />
    </PopoverContent>
  </Popover>

}