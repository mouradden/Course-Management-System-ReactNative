import { Text } from "react-native";

export const TodayDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const todayDate = today.toLocaleDateString('en-US', options);
    return (
        <>
            <Text className='text-lg text-blue-500 font-bold'>{todayDate}</Text>
        </>
    );
};