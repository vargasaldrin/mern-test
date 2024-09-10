import { useState } from "react";
import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const initialProductState = {
	name: "",
	price: "",
	image: "",
};

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState(initialProductState);
	const toast = useToast();
	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
		setNewProduct(initialProductState);
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create new product
				</Heading>
				<Box
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					p={6}
					rounded={"lg"}
					shadow={"md"}
				>
					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
						/>
						<Input
							placeholder="Price"
							name="price"
							value={newProduct.price}
							onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })}
						/>
						<Input
							placeholder="Image URL"
							name="image"
							value={newProduct.image}
							onChange={(event) => setNewProduct({ ...newProduct, image: event.target.value })}
						/>
						<Button colorScheme="blue" onClick={handleAddProduct} w="full">
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};

export default CreatePage;
