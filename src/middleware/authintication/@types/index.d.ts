interface DataStored {
     _id: string;
}

interface RequestAuthentication extends Request {
     user: DataStored;
}

interface responseData {
     _id: string
     username: string
     fullname: string
}
