import { useContext } from "react";
import { Link } from "react-router-dom";
// iconos
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
// componentes
import { CartItem } from "./CartItem";
// context
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

export const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;

    const message = encodeURIComponent(
      cart
        .map(
          (item) =>
            `${item.title || item.name} x${item.amount || 1} - $${(
              item.price * (item.amount || 1)
            ).toFixed(2)}`
        )
        .join("\n") + `\n\nTotal: $${parseFloat(total).toFixed(2)}`
    );
    
    window.open(`https://wa.me/+AGERGARANUMERO?text=${message}`, "_blank");
  };
  
  return (
    <>
      <div
        className={`${
          isOpen ? "right-0" : "-right-full"
        } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
      >
        <div className="flex items-center justify-between py-6 border-b">
          <div className="uppercase text-sm font-semibold">
            Carrito de Compra({itemAmount})
          </div>
          <div
            onClick={handleClose}
            className="cursor-pointer w-8 h-8 flex justify-center items-center"
          >
            <IoMdArrowForward className="text-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 h-[500px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
          {cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>

        <div className="flex flex-col gap-y-3 py-4 mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="uppercase font-semibold">
              <span className="mr-2">Total:</span>${" "}
              {parseFloat(total).toFixed(2)}
            </div>
            <div
              onClick={clearCart}
              className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            >
              <FiTrash2 />
            </div>
          </div>
          <Link
            to={"/"}
            onClick={console.log(cart, clearCart, total, itemAmount)}
            className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
          >
            Ver Carrito
          </Link>
          <button
            onClick={handleSendWhatsApp}
            className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
          >
            Enviar por WhatsApp
          </button>
          
        </div>
      </div>
    </>
  );
};
