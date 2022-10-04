
const paginate = (followers) => {
    const itemsPerPage = 9;
    // Math.ceil : làm tròn lên 
    const pages = Math.ceil(followers.length / itemsPerPage);

    // tạo ra một mảng gồm 10 phần tử
    const newFollowers = Array.from({ length: pages }, (_, index) => {
        const start = index * itemsPerPage;
        return followers.slice(start, start + itemsPerPage)
    })

    return newFollowers;
}

export default paginate;

