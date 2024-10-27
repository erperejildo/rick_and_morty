import './spinner.scss';

const SpinnerComponent = () => {
  return (
    <div className="spinner" role="status" aria-live="polite" aria-busy="true">
      <div className="spinner-border"></div>
    </div>
  );
};

export default SpinnerComponent;
