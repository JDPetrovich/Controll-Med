import { Redirect } from 'expo-router'

const IndexPage = () => {
    const autenticacao = false;

    if (autenticacao) {
        <Redirect href={"/(tabs)"} />
    }

    return (
        <Redirect href={"/(auth)/login"} />
    )
}

export default IndexPage;