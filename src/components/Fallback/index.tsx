export default function Fallback() {
  return (
    <div className='d-flex justify-content-center mt-3'>
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
}
