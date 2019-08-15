export const fetchRegisteredModules = () =>{
    //make the http call to backend
    return{
        labels: ['android', 'node', 'web Development 1', ' Web Development 2', 'Wordpress'],
        datasets: [
            {
                backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
                data: [120, 150, 180, 90]
            }
        ]
    }
}

export const Modules = () =>{
    //fetch modules from backend server
    return {
     data:{
        datasets:[
            { id: 1, name: 'android' },
            { id: 2, name: 'Web Development 1' },
            { id: 3, name: 'Web Development 2' },
            { id: 4, name: 'Node' },
            { id: 5, name: 'Wordpress' }
        ]
    }}
}

export const  AttendanceList = () =>{
    //fetch lesson attendance from backend api
    return {
        labels: ['android', 'node', 'web Development 1', ' Web Development 2', 'Wordpress'],
        datasets: [
            {
                label: '1st Years',
                backgroundColor: 'rgba(255,0,255,0.75)',
                data: [11, 13, 24, 35, 36]
            },
            {
                label: '2nd Years',
                backgroundColor: 'rgba(0,255,0,0.75)',
                data: [11, 23, 34, 25, 16]
            },
            {
                label: '3rd Years',
                backgroundColor: '#ffffff',
                data: [10, 20, 30, 20, 16]
            },
            {
                label: '4th Years',
                backgroundColor: '#4b94bf',
                data: [9, 3, 4, 5, 6]
            }
        ]
    }
}
export const fetchLineGraphDataForModuleRegistration = () =>{
    //make http call to the backend
    return {
        labels: ['android', 'node', 'web Development 1', ' Web Development 2', 'Wordpress'],
        datasets: [
            {
                label: '1st years',
                fillColor: 'rgba(255,0,255,0.75)',
                data: [30, 19, 40, 25, 19],
            },
            {
                label: '2nd years',
                fillColor: '#4b94bf',
                data: [20, 15, 19, 40, 10],
            },
            {
                label: '3rd years',
                fillColor: 'rgba(0,255,0,0.75)',
                data: [20, 30, 10, 15, 12]
            },
            {
                label: '4th years',
                data: [10, 12, 9, 8, 7]
            }
        ]
    }
}
export const FetchDoughnutDataForFeesPaid = () =>{
    //fetch data from the api
    return {
        labels: ['android', 'node', 'web Development 1', ' Web Development 2', 'Wordpress'],
        datasets: [
            {
                backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
                data: [12, 15, 18, 90, 30]
            },
            
        ]
    }
}


export const fetchjwt = () =>{
    return  localStorage.getItem('AUTH_TOKEN')
}
           