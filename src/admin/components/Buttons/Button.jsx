/* eslint-disable react/prop-types */

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  loading = false,
}) => {
  // Base button styles
  const baseStyles = 'px-4 py-2 rounded text-white font-semibold focus:outline-none transition-all duration-200';

  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 disabled:bg-red-400',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {loading ? (
		<p className='flex cursor-not-allowed gap-2 w-full justify-center items-center'>
        <span className="spinner-border block animate-spin border-[3px] shadow-inner border-t-slate-400 border-white w-4 h-4 rounded-full"></span>
		Loading... 
		</p>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
