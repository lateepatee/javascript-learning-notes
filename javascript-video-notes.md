1. Opitaan alkeet, jotta jatkossa on helpompi kehittyä itsenäisesti.

2. Ei tarvi kertoa mitä muuttujat on, javascript tunnistaa esim muuttua x = 0 eli numero. Javascriptiä on kaikkialla. Käytetyin ohjelmointikieli maailmassa.

3. Client, kun käyttää javascriptiä html:ssä tarvii <script> <script> sarakkeet. serverillä tarvii node.js. npm sisältää valmiita paketteja toiminnallisuuksiin.

4. VSC hyvä editori javascriptille. Käteviä extensioneita! ESLint, Prettier, JavaScript (ES6) code snippets. NVM (node version manager) lataa ja päivittää Node.js

5. Demo jossa näyttää asentelut.

6. Tehään Node.js appi. Tekstin pitää olla ”sisällä” muuten js luulee että yrittää kirjoittaa komentoa. 

7.Koodin kommentointi. // tällä lailla. Tämän avulla voi myös blockata koodia. pitempi pätkä /* */.  Jos kaikkea koodia tarvii kommenteilla selkeyttää, se on liian sekavaa.

8. Demo kommentoinnnista. kommenteilla voi lisätä kontekstia koodille, itselle to do listaa, poistaa koodia käytöstä ilman että poistaa sitä kokonan.

9. Muuttujat. var sitä voi muuttaa ja se on joustava. let toimii vain ”blockissa”. const ei voi muuttaa jälkeenpäin. const yleisesti, let loopeissa, varille ei niinkään tarvetta nykyään.

10. Demo muuttujista. käytännössä kuinka let ja const toimii.

11. Useamman merkkijonon yhdistäminen onnistuu + merkillä.

12. merkkijono demo. samat vinkit kuin aikaisemmassa mutta käytännössä.

13. ?

14. ´backticks´ muuttaa template literaliksi. 

15. Data types. Simppelit numero, totuus(boolean), Date, Function, Array. Spesiaali tyypit Nan, null. 

16. Data types demo. testaa boolean true/false instanceof komennolla onko esim str String.

17. Matikkaa. Samanlaista kuin c#.

18. Matikka demo. 

19. Merkkijonojen muuttaminen numeroiksi. parseInt() kokonaisluvuille, parseFloat() desimaaliluvuille. Jos yrittää converttaa ei numeroita tulee NaN virhe.

20. Demo edellisestä muuttamisesta.

21. Virhetilanteet. Try = ”yritän tehdä tämän” catch = ”jos joku menee pieleen, teen tämän” ja finally = ”teen tämän jokatapauksessa”

22. Demo virheiden käsittelystä. 

23. Date sisältää päivämäärän ja ajan. const now = new Date(); kuukaudet alkavat nollasta. eli lokakuu yhdeksäs. const.set voi asettaa vuoden kuukauden ja päivän. myös tunnit sekunnit ja minuutit.

24. Demo päivämääristä ja ajasta.

25. boolean logic with if statements. kannattaa käyttää vertailussa === koska == antaa esim ”42” string = 42 int. ei tarvi {} jos tekee vain yhden rivin koodia.

26. Demo näistä if lausekkeista.

27.Boolean logic with switch and other syntax. Positiivisen tarkastelu on helpompi kuin negatiivisen. and && ja or ||. Switchiä käyttäessä pitää muistaa break; koska muuten koodi jatkaa pyörimistä.

28. Demo switch ja other.  switchillä se printtaa vaan kun muuttuja täsmää esim const paiva = 3 ja sitten laitetaan switch(paiva) { case1 etc.. kun case 3: tulee se printtaa keskiviikko ja loppuu. skippaa ne case 1 maanantai ja case 2 tiistai.

29. taulukot/creating arrays.  taulukon pituus pitää määrittää. let arrayLegth = 5; let arr2 = Array(arrayLegth); ja let arr1 = []; 	tässä tapauksessa arr1 pituus on 0 ja arr2 pituus on 5.

30.Demo creating arrays.

31. Populating arrays. indexi alkaa nollasta. eka itemi taulukossa = index 0. 

32. Taulukon täyttö demo.

33. Array methods. array.push lisää yhden tai useaman arvon taulukon loppuun ja palauttaa uuden pituuden. array.pop poistaa arvon taulukon lopusta ja palauttaa poistetun arvon. array.shift poistaa tauluon alusta. array.unshift lisää taulukon alkuun. concat yhdistää kaksi taulukkoa yhdeksi uudeksi.

34. Array methods demo. 

35. loops, silmukat. suorittaa koodin pätkää useamman kerran. esim while, for, for of. for of on sama kuin c# foreach.

36. Silmukat demo.

37. Functions. perus koodi pätkiä. ne suorittaa rutiini taskejä. Käteviä kun on toistuvia toimintoja koodin määrä vähenee kun käyttää functions. Jos haluaa muokata niin ei tarvi joka kohtaan vaan pelkästään functionia muokata. keyword-name-parameters.

38. Functions demo. kun se on määritetty, sitä voi kutsua mistä vain. tarkkana nimeämisessä ei toimi kaikilla erikoismerkeillä.

39. Arrow functions. pitää määrittää muuttujaan tai käyttää heti. => . 

40. Demo Arrow functions.  const add = (a, b) => a + b; console.log(add(1, 2)); tässä ilman returnia. mutta jos useampi rivi koodia lisää return komento. esim määrittä result muuttuja ja return result;

41.JSON= JavaScript  Object Notation. nimi arvo pareja. järjestetty lista arvoja. name-value pairs. esim ”title” : ”Becoming”, jne jne. näitä muutetaan merkkijonoiksi. var json = JSON.stringify(book); . JSON.parse = Deserialize takaisin objectiksi.

42. JSON demo. stringify tekee name-value  pareista merkkijonoja. parse tekee merkkijonon takaisin taulukoksi/objectiksi, eli palauttaa sen.

43. Objects. javascript objecteilla on properties ja associated methods. eli ominaisuudet ja metodeja joita objecteille voi tehdä. esimerkiksi kirjalla on kirjailija, nimi ja kirjan voi vaikka lainata. koostuu nimi-arvo pareista. voi tehdä konstruktorin kautta, konstruktorissa tehdään new Object() ja sinne lisätään ominaisuuksia esim book.title. Action = method.

44. demo objects. 

45.Promises for long running operations. useimmat sovellukset käyttää yhtä threadiä(yksi aktiviteetti kerrallaan). promise kertoo että koodi on valmistunnu, jotta voi mennä seuraavaan yms. resolve when operation succeeds, reject when operation fails. sitten .then on succes(resolve). Jos tulee epäonnistuminen(reject) sitten .catch.

46. Demo promises.

47. async and await makes promises easier to read and write. It makes async code look like nomal synchronous code

48. Use await to wait for promise to finish. Wrap it in try catch so u can handle errors easily. 

49. npm stans for node package manager. u can use it to download and use other peoples code so u dont have to code everything from scratch.

50. use npm init to create package.json file. Then npm install to add packages to node_modules folder.

51. Keep practicing by building own projects. Check out other frameworks or go deeper into node.js

