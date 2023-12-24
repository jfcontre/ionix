
interface Props {
  count: number
}
export const TodoLabelCounter = ({ count }: Props) => {
  return (
    <p className="font-bold text-2xl py-4">Todos Counter : {count}</p>
  )
}
