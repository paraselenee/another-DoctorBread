-- MySQL dump 10.13  Distrib 5.7.19, for osx10.12 (x86_64)
--
-- Host: localhost    Database: doctorbread
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bakery`
--

DROP TABLE IF EXISTS `bakery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bakery` (
  `bakeryId` bigint(11) NOT NULL AUTO_INCREMENT,
  `bakeryName` varchar(255) DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`bakeryId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bakery`
--

LOCK TABLES `bakery` WRITE;
/*!40000 ALTER TABLE `bakery` DISABLE KEYS */;
INSERT INTO `bakery` VALUES (1,'柔 Tenderness',NULL,'天平路318号'),(2,'Fascino',NULL,'上海长宁区番禺路 381 号 F 座 101'),(3,'Avec toi',NULL,'天平路73号'),(4,'哈肯铺 Hogan',NULL,'天钥桥路133号一楼/兴业路123弄5号102-103单元'),(5,'酵墅 Villabrot',NULL,'无锡/南京'),(6,'美仕唐纳滋 Mister Donut','','哪都有'),(7,'石窑面包 Briant',NULL,'茂名北路233号(丰盛里C-11)'),(8,'Sunflour',NULL,'正大广场B1'),(9,'人道素菜烘焙坊',NULL,'静安区愚园路151号1楼'),(10,'原麦山丘',NULL,NULL),(11,'面包仓库',NULL,'美罗城地下一层'),(14,'梵印烘焙Brahmamark',NULL,'陕西南路382号/淮海中路1877号/武宁南路395号/北横沥路51号'),(15,'云朵上的鱼',NULL,'金科路2889号长泰广场1层'),(16,'Christine FlagShip','','徐家汇地铁站12号口'),(17,'Ole\' ','','港汇广场B1'),(18,'琳德烘焙','','港汇广场B1'),(19,'国际饭店','',''),(20,'沃德wode','',''),(21,'面包篮子','','虹梅路3190号/南京西路1515号静安嘉里中心1层'),(22,'RiceZone','','宜山路455号光启城购物中心一层177-180号商铺'),(23,'喜粤8号',NULL,'汝南街63号');
/*!40000 ALTER TABLE `bakery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bread`
--

DROP TABLE IF EXISTS `bread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bread` (
  `breadId` bigint(20) NOT NULL AUTO_INCREMENT,
  `bakeryId` bigint(11) NOT NULL,
  `breadName` varchar(255) CHARACTER SET gbk DEFAULT NULL,
  `rating` int(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `buyAgain` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`breadId`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bread`
--

LOCK TABLES `bread` WRITE;
/*!40000 ALTER TABLE `bread` DISABLE KEYS */;
INSERT INTO `bread` VALUES (2,4,'柠檬贝果',0,'一口都不要吃',NULL,''),(3,4,'柚香柚蜜',5,NULL,NULL,NULL),(4,4,'蜂酿柠檬',7,NULL,NULL,NULL),(5,4,'蔓越莓贝果',2,'这是我最后一次买贝果',NULL,NULL),(6,4,'奥勒冈番茄馅饼',5,'',0,'po图'),(7,4,'紫米杂粮',6,'',0,''),(8,4,'古典巧克力',3,'一般',NULL,NULL),(9,4,'奶酥好球',3,'没什么印象',NULL,NULL),(10,4,'枫糖玛德莲',3,'一般',NULL,NULL),(11,4,'南瓜丹麦派',5,NULL,NULL,NULL),(12,4,'牛角可颂',2,'好难吃/我觉得无功无过',NULL,NULL),(13,4,'米酿荔香',6,'趁刚出炉的时候吃',NULL,NULL),(14,4,'核桃肉桂卷',4,'很甜/没什么印象',NULL,NULL),(15,4,'黄金栗子烧',7,'人间美味',NULL,NULL),(16,4,'菠萝面包',2,'完全没印象',NULL,NULL),(17,2,'枫糖欧布里',7,'',0,''),(18,2,'法国红豆',6,'',0,''),(19,2,'裸麦无花果',4,'太难嚼',NULL,NULL),(20,2,'可颂',3,'没印象',0,''),(21,2,'丹麦黑芝麻麻薯',3,'黑芝麻撒得哪里都是，口感太干',NULL,NULL),(22,5,'芝麻餐包',7,'有巧克力味',NULL,NULL),(23,3,'可颂',6,NULL,NULL,NULL),(24,3,'黑麦面包',3,'人间极品',NULL,NULL),(25,6,'芬迪巧果',4,'',NULL,''),(26,6,'芬迪焦糖',4,NULL,NULL,NULL),(27,6,'欧菲香',4,NULL,NULL,NULL),(28,6,'朱古菲香',4,NULL,NULL,NULL),(29,6,'迷你芬迪狮',4,NULL,NULL,NULL),(30,6,'哈尼菲香',5,NULL,NULL,NULL),(31,6,'香蕉绵绵圈',5,NULL,NULL,NULL),(32,6,'双重芒果麦芬',5,NULL,NULL,NULL),(33,6,'朱古可可芬迪',3,NULL,NULL,NULL),(34,7,'可颂',4,'层次鲜明',NULL,NULL),(35,2,'蔓越莓司康',3,NULL,NULL,NULL),(36,8,'阳光海盐可颂',4,'大概是这家的',NULL,NULL),(37,8,'枫糖吐司',5,NULL,NULL,NULL),(38,8,'蔓越莓乳酪',7,NULL,NULL,NULL),(39,8,'无花果全麦',7,NULL,NULL,NULL),(40,3,'葡萄干蜗牛卷',4,NULL,NULL,NULL),(41,1,'杏仁羊角',7,NULL,NULL,NULL),(42,1,'黄油羊角',5,NULL,NULL,NULL),(43,1,'朋子苏',5,'略苦',NULL,NULL),(44,1,'意式柠檬夹心千层酥',7,NULL,NULL,NULL),(45,1,'法棍',4,'太软，也可能是因为天气太潮',NULL,NULL),(46,1,'巧克力羊角',5,NULL,NULL,NULL),(47,1,'心意包',6,'比心',NULL,NULL),(48,1,'核桃葡萄包',7,'可爱的面包干',NULL,NULL),(49,9,'招牌车轮紫米条',7,'17年的第一口面包',NULL,NULL),(50,9,'花之恋芒果',6,'芒芒哒',NULL,NULL),(51,9,'香芋之恋',6,NULL,NULL,NULL),(52,10,'红磨坊',3,'黑暗料理：杂粮面团、青芥末、培根、匈牙利红辣椒',1,''),(54,4,'黑芝麻贝果',2,'',NULL,''),(56,18,'碱水圈',5,'',NULL,''),(57,14,'巧克力',4,'不好吃',NULL,''),(58,16,'南瓜',6,'找不到了，sad',NULL,''),(59,21,'蔓越莓覆盆子奶酪',7,'',NULL,''),(60,14,'绿豆沙？',6,'天牛侠说 其实不好吃',NULL,''),(61,23,'星级叉烧',5,'略微逊色于这回点的其他菜，但还是比我吃过的叉烧都好吃！',NULL,''),(62,23,'水晶虾饺皇',7,'虾肉超弹，内有脆脆的马蹄',NULL,''),(63,23,'陈皮红豆沙',5,'味道诡异。有点中药味，但量正好。黄同学喝了两大勺。',NULL,''),(64,23,'碧绿菌皇炒带子',6,'大虾和大带子口感都十分出众，但是君皇、彩椒、荷兰豆又出乎意料的一般。',NULL,''),(65,23,'咕噜肉',6,'本来吃的盘子跟舔过一样干净，结果还剩最后半个草莓的时候被收走了。我们大概是这个腰围惊人的老板见过的，吃的最干净的顾客了吧，走的时候还跟我们说了谢谢。',NULL,''),(66,23,'蟹子烧卖皇',4,'分量足，但味道像湾仔码头三鲜水饺。。。',NULL,''),(67,23,'普洱茶',5,'茶壶朴素，茶味平淡，解腻，两人10元无限续杯，然而第二壶就已是白开水。',NULL,''),(68,24,'tingting',NULL,NULL,NULL,NULL),(69,24,'dingdong',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `bread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'',''),(2,'mark','sss'),(3,'sheldon2','amy2'),(4,'sheldom','amy2222'),(5,'sheldom','amy2222'),(6,'sheldom','amy2222'),(7,'sheldom','amy2222'),(8,'sheldon2','amy2222'),(9,'sheldonAmy','amy2'),(10,'test','123'),(11,'test','123'),(12,'testttt','123'),(13,'sheldon2','amy2'),(14,'sheldon2','amy2'),(15,'sheldon2','amy2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-04 15:37:24
