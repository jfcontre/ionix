
import ImgNoData from '/images/no_data.png'
export const TodoListEmpty = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <img src={ImgNoData} alt="No data" style={{ width: '100%', height: 300 }} />
      <p className="text-center font-bold text-3xl w-full">No Todos Found</p>
    </div>
  )
}
