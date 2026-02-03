export default function AvisoLegal() {
    return (
        <div className="container" style={{ padding: '80px 20px', maxWidth: '800px' }}>
            <h1>Aviso Legal</h1>
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan a continuación los siguientes datos:</p>
                <p><strong>Titular del Sitio Web:</strong> OaxacaFit.com<br />
                    <strong>Correo electrónico de contacto:</strong> contacto@oaxacafit.com</p>
                <p>OaxacaFit actúa como un directorio publicitario para negocios de fitness y salud. No se hace responsable de los servicios prestados por los anunciantes.</p>
                {/* Adicionalmente se puede agregar contenido genérico de protección de datos */}
            </div>
        </div>
    );
}
