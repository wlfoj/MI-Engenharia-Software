import EventsHome from '@/components/home/eventsHome';

export default function Search() {

    return (
        <div className='flex flex-col justify-center pt-[150px] items-center bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200'>

            <div className="flex justify-center lg:w-[60vw] w-[95vw] min-h-[8rem] flex-col bg-gray-300 rounded-xl">
                <EventsHome />
            </div>
            <h1 className='flex justify-center text-white text-[14px] lg:text-[18px] my-2 '>Esses são todos os eventos correspondentes</h1>
        </div>
    );
}