export const metadata = {
    title: 'Nova Rota',
    description: 'Layout específico para Nova Rota',
};

export default function NovaRotaLayout({ children }) {
    console.log("Montando layout para Nova Rota");
    return (
        <div>
            <header>
                <h1>Bem-vindo à Nova Rota</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}

