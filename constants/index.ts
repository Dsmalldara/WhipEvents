type headerLinks = {
    title: string,
    href: string
}
export const headerLink:headerLinks[] = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'Create Events',
        href: '/Event/createEvent'
    },
    {
        title:'Your Profile',
        href:'/Event/Profile'
    } 
]
type eventValues = {
    title: string,
    description: string,
    location: string,
    imageUrl: string,
    startDate: Date,
    endDate: Date,
    categroyId: string,
    price: string,
    isFree: boolean,
    url: string

}
export const eventValues ={
title :'',
description: '',
location:'',
imageUrl:'',
startDate: new Date(),
endDate :new Date(),
categroyId: '',
price:'',
isFree: false,
url:''
}