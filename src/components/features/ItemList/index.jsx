import MediaCard from "../../card";
import { Box, Button, Grid, Typography } from "@mui/material";
import { addCart } from "../../../redux/store/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Modal } from "../../modal";
import { useEffect, useState } from "react";
import { SearchInput } from "../../search";
import { Carousel } from "../carousel";
import ArticleIcon from "@mui/icons-material/Article";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const arrayDates = [
  {
    id: 1,
    img: "https://cafedajo.com.br/wp-content/uploads/2021/07/Hamburguer-sem-fundo-300x219.png",
    content: "O pastel acompanha camarão com molho doce ou salgado  ",
    title: "hambúrguer",
    subtitle: "Combo hambúrguer e batata e refri",
    assessment: 4,
    price: 25.0,
    amount: 1,
  },
  {
    id: 2,
    img: "https://img.freepik.com/fotos-premium/hamburguer-com-alface-de-tomate-de-queijo-cheddar-e-cebola-roxa-isolada-no-fundo-branco_465253-2.jpg",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "hambúrguer",
    subtitle: "Combo hambúrguer duplo",
    assessment: 1,
    price: 56.0,
    amount: 1,
  },
  {
    id: 3,
    img: "https://4.bp.blogspot.com/-KL8DBUKZHPM/Tt5qJZNcouI/AAAAAAAAAfA/B5epd9YNPfc/s1600/tapioca.png",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Tapioca",
    subtitle: "Tapioca recheada",
    assessment: 2,
    price: 25.0,
    amount: 1,
  },
  {
    id: 4,
    img: "https://static.wixstatic.com/media/d811f7_c9f3e1dab6d64ab2bf58c01c11bffb85~mv2.png/v1/fill/w_540,h_376,al_c,lg_1,q_85,enc_auto/pastel%20de%20frango%20c%20catupiry.png",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pastel",
    subtitle: "Pastel super recheado",
    assessment: 4,
    price: 12.0,
    amount: 1,
  },
  {
    id: 5,
    img: "https://foodmagazine.com.br/imagens/noticias/Monstro_Burguer_um_dos_mais_vendidos_bn.jpg",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "hambúrguer",
    subtitle: "hambúrguer simples",
    assessment: 2.3,
    price: 42.0,
    amount: 1,
  },
  {
    id: 6,
    img: "https://img.freepik.com/fotos-premium/hamburguer-sem-fundo_66159-3.jpg?w=2000",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "hambúrguer",
    subtitle: "hambúrguer artesanal",
    assessment: 4.5,
    price: 15.0,
    amount: 1,
  },
  {
    id: 7,
    img: "https://www.natuslanches.com.br/wp-content/uploads/2014/12/natus-lanches-passo-fundo-43-x-especial-600x400.png",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "hambúrguer",
    subtitle: "hambúrgue de frango",
    assessment: 3,
    price: 55.0,
    amount: 1,
  },
  {
    id: 8,
    img: "https://st2.depositphotos.com/1007298/6468/i/600/depositphotos_64680765-stock-photo-mini-pizza.jpg",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pizza",
    subtitle: "Mini pizzas ",
    assessment: 5,
    price: 35.0,
    amount: 1,
  },
  {
    id: 9,
    img: "https://img.freepik.com/fotos-gratis/pizza-havaiana_74190-2500.jpg?w=2000",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pizza",
    subtitle: "Pizza gigante tamanho G",
    assessment: 4,
    price: 24.0,
    amount: 1,
  },
  {
    id: 10,
    img: "https://imagensemoldes.com.br/wp-content/uploads/2020/05/Foto-Pastel-PNG.png",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pastel",
    subtitle: "Pastel da casa simples",
    assessment: 1.5,
    price: 15.0,
    amount: 1,
  },
  {
    id: 11,
    img: "https://www.gudegula.com.br/img/banner-tapioca.jpg",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Tapioca",
    subtitle: "Tapioca doce",
    assessment: 2,
    price: 25.0,
    amount: 1,
  },
  {
    id: 12,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Vl3hfad9AVraaMdJ3Y2VkxvX17n2ajv7z_WyLxU_uFUolwiuOPneyJxe1Kn8LSobIIU&usqp=CAU",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Tapioca",
    subtitle: "Tapioca simples",
    assessment: 2,
    price: 25.0,
    amount: 1,
  },
  {
    id: 13,
    img: "https://fastacai.com.br/wp-content/themes/br_fastacai/assets/images/tapioca/tapioca-presunto-queijo.png",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Tapioca",
    subtitle: "Tapioca da casa",
    assessment: 2,
    price: 25.0,
    amount: 1,
  },
  {
    id: 14,
    img: "https://t3.ftcdn.net/jpg/03/00/95/38/360_F_300953830_gsK0Viv3b8NspmbHh2AQnyEa7x8NwAAS.jpg",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Tapioca",
    subtitle: "Tapioca do mestre",
    assessment: 2,
    price: 25.0,
    amount: 1,
  },
  {
    id: 15,
    img: "https://imagensemoldes.com.br/wp-content/uploads/2020/05/Pastel-PNG-de-Carne.png",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pastel",
    subtitle: "Pastel da carne",
    assessment: 1.5,
    price: 15.0,
    amount: 1,
  },
  {
    id: 16,
    img: "https://riomarkennedyonline.com.br/riomarkennedyonline/2020/05/Pastel-_frango-_del%C3%ADcia-_40cm_cheppitos.jpg",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pastel",
    subtitle: "Pastel da frango",
    assessment: 1.5,
    price: 15.0,
    amount: 1,
  },
  {
    id: 17,
    img: "https://cdn.awsli.com.br/800x800/1568/1568912/produto/5840753624618a8fd0.jpg",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pastel",
    subtitle: "Pastel de queijo",
    assessment: 1.5,
    price: 15.0,
    amount: 1,
  },
  {
    id: 18,
    img: "https://spontanearestaurante.com.br/wp-content/uploads/2020/11/FOTO-SEM-FUNDO-02-1.png",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pizza",
    subtitle: "Pizza do chefe",
    assessment: 4,
    price: 24.0,
    amount: 1,
  },
  {
    id: 19,
    img: "https://i2.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/png-pizza-peperoni.png?fit=696%2C314&ssl=1",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pizza",
    subtitle: "Pizza da casa",
    assessment: 4,
    price: 24.0,
    amount: 1,
  },
  {
    id: 20,
    img: "https://img.freepik.com/fotos-gratis/o-pepperoni-em-fatias-finas-e-uma-cobertura-de-pizza-popular-em-pizzarias-de-estilo-americano-isolado-no-fundo-branco-natureza-morta_639032-229.jpg?w=2000",
    content:
      "O melhor lanche da cidade você encontra aqui! Vem matar a fome antes que ela te mate ! 😀",
    title: "Pizza",
    subtitle: "Pizza  de calabresa",
    assessment: 4,
    price: 24.0,
    amount: 1,
  },
];

export const ItemList = () => {
  const Cart = useSelector((state) => state.addCart.products);

  const [open, setOpen] = useState(false);
  const [itemList, setItemList] = useState();
  const [filterArray, setFilterArray] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const AddItemCart = (item) => {
    let index = Cart?.findIndex((val) => val.id === item.id);
    if (index > -1) {
      toast.error("Este item já existe");
      return;
    } else {
      dispatch(addCart(item));
      toast.success("Item adicionado ao carrinho");
    }
  };

  const handleDetails = (item) => {
    setItemList(item);
    setOpen(true);
  };
  const filterNew = filterArray.filter(
    (item) =>
      item.title.toLowerCase().includes(search) ||
      item.subtitle.toLowerCase().includes(search)
  );

  useEffect(() => {
    setFilterArray(arrayDates);
    setFilterCategory([...new Set(arrayDates.map((item) => item.title))]);
  }, []);

  return (
    <>
      <SearchInput setSearch={setSearch} />
      <Carousel
        filterCategory={filterCategory}
        arrayDates={arrayDates}
        setFilterArray={setFilterArray}
      />

      <Modal open={open} setOpen={setOpen} itemList={itemList} />
      <Grid
        sx={{ display: "grid", gap: 2, marginLeft: 8 }}
        justifyContent="center"
        alignItems="center"
        gridTemplateColumns="repeat(auto-fit, minmax(260px, 1fr))"
      >
        {filterNew.map((item) => (
          <MediaCard
            item={item}
            key={item?.id}
            title={item?.subtitle}
            img={item?.img || ""}
            price={item?.price}
            actions={
              <>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    maxWidth: 50,
                    backgroundColor:
                      item?.assessment <= 2 ? "#dd1f1f" : "#0fc21e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    bottom: 205,
                    left: 100,
                    borderRadius: 1,
                  }}
                >
                  <Typography fontSize={11} color={"white"} fontWeight={"700"}>
                    {item?.assessment <= 2 ? "50%OFF" : "25%OFF"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    right: 100,
                    bottom: 220,
                  }}
                >
                  <IconButton onClick={() => handleDetails(item)}>
                    <ArticleIcon sx={{ color: "#ce0303" }} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => AddItemCart(item)}
                    sx={{
                      backgroundColor: "#e64d10",
                      "&:hover": {
                        backgroundColor: "#b83e0d",
                      },
                    }}
                    variant="contained"
                  >
                    <AddCircleIcon />
                  </Button>
                </Box>
              </>
            }
          />
        ))}
      </Grid>
    </>
  );
};
