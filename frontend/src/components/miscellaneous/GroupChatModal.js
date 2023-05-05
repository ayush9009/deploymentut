// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     Button,
//     useDisclosure,
//     FormControl,
//     Input,
//     useToast,
//     Box,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useState } from "react";
// import { ChatState } from "../../Context/ChatProvider";
// import UserListItem from "../UserAvatar/UserListItem"
// import UserBadgeItem from "../UserAvatar/UserBadgeItem"


// const GroupChatModal = ({ children }) => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [groupChatName, setGroupChatName] = useState();
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [search, setSearch] = useState("");
//     const [searchResult, setSearchResult] = useState([]);  //whatever we get search result from the api 
//     const [loading, setLoading] = useState(false);
//     const toast = useToast();

//     const { user, chats, setChats } = ChatState();

//     const handleGroup = (userToAdd) => {
//         if (selectedUsers.includes(userToAdd)) {      //useToadd isme vo hai jo aap add kar rai,agr includes se pata chlega ki ye kahi already exist to ni kara if yes to user already added
//             toast({
//                 title: "User already added",
//                 status: "warning",
//                 duration: 5000,
//                 isClosable: true,
//                 position: "top",
//             });
//             return;
//         }
//         // aur agr aisa nhi to setSelectedUsers users mai usertoadd daldo
//         setSelectedUsers([...selectedUsers, userToAdd]);
//     };
//     const handleSearch = async (query) => {
//         setSearch(query);
//         if (!query) {
//             return;
//         }

//         try {
//             setLoading(true);//as the search starts
//             const config = {
//                 headers: {//this is how we pass the token
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             };
//             const { data } = await axios.get(`/api/user?search=${search}`, config);
//             console.log(data);
//             setLoading(false);
//             setSearchResult(data);  //jo search karne kai bad data mila uski value set kar di
//         } catch (error) {
//             toast({
//                 title: "Error Occured!",
//                 description: "Failed to Load the Search Results",
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom-left",
//             });
//         }
//     };

//     const handleDelete = (delUser) => {
//         setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
//     };

//     const handleSubmit = async () => {
//         if (!groupChatName || !selectedUsers) {  //mtlb koi bhi agr empty hui to
//             toast({
//                 title: "Please fill all the feilds",
//                 status: "warning",
//                 duration: 5000,
//                 isClosable: true,
//                 position: "top",
//             });
//             return;
//         }

//         try {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             };
//             const { data } = await axios.post(  //post kuki aap data api kai through backend mai  bej rai
//                 `/api/chat/group`,
//                 {
//                     name: groupChatName,
//                     users: JSON.stringify(selectedUsers.map((u) => u._id)),   //api mai data json ki form mai jave pahle stringify lagaya then JSON
//                 },
//                 config
//             );
//             setChats([data, ...chats]);    //jo humari chats usme data ko dal rai
//             onClose();  //ek bar ye sab kam hogya to jo vo dibba se khulke ave to bnd kardo
//             toast({
//                 title: "New Group Chat Created!",
//                 status: "success",
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom",
//             });
//         } catch (error) {
//             toast({
//                 title: "Failed to Create the Chat!",
//                 description: error.response.data,
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom",
//             });
//         }
//     };

//     return (
//         <>
//             <span onClick={onOpen}>{children}</span>
//             {/* ye jo children ye button hai MyChats.js to us button ko yaha render kar liya */}

//             <Modal onClose={onClose} isOpen={isOpen} isCentered>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader
//                         fontSize="35px"
//                         fontFamily="Work sans"
//                         d="flex"
//                         justifyContent="center"
//                     >
//                         Create Group Chat
//                     </ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody d="flex" flexDir="column" alignItems="center">
//                         <FormControl>
//                             <Input
//                                 placeholder="Chat Name"
//                                 mb={3}
//                                 onChange={(e) => setGroupChatName(e.target.value)}
//                             />
//                         </FormControl>
//                         <FormControl>
//                             <Input
//                                 placeholder="Add Users eg: Aayush, Gaurav, Yugant"
//                                 mb={1}
//                                 onChange={(e) => handleSearch(e.target.value)}
//                             />
//                         </FormControl>
//                         <Box w="100%" d="flex" flexWrap="wrap">
//                             {selectedUsers.map((u) => (
//                                 <UserBadgeItem
//                                     key={u._id}
//                                     user={u}
//                                     handleFunction={() => handleDelete(u)}
//                                 />
//                             ))}
//                         </Box>
//                         {loading ? (

//                             < div > Loading...</div>
//                         ) : (
//                             searchResult
//                                 ?.slice(0, 4)  //yani top four
//                                 .map((user) => (
//                                     <UserListItem
//                                         key={user._id}
//                                         user={user}
//                                         handleFunction={() => handleGroup(user)}
//                                     />
//                                 ))
//                         )}
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button onClick={handleSubmit} colorScheme="blue">
//                             Create Chat
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal >
//         </>
//     );
// };

// export default GroupChatModal;


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                `/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            setChats([data, ...chats]);
            onClose();
            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users eg: Gaurav, Yugant, Aayush"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box w="100%" d="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        {loading ? (
                            // <ChatLoading />
                            <div>Loading...</div>
                        ) : (
                            searchResult
                                ?.slice(0, 4)
                                .map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GroupChatModal;