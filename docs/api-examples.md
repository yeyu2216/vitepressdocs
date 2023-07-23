#  spring必背
## 什么是spring?

1. ​	Spring是一个轻量级Java开发框架，目的是为了解决企业级应用开发类与类之间的耦合问题。
2.   解决企业级应用开发的复杂性，即简化Java开发。
3. ​	两个核心特性，也就是依赖注入 IOC（dependency injection，DI）和面向切面编程（aspect oriented programming，AOP）

## Spring的两大核心概念

   **ioc**:  通过spring容器自动装配类与类之间的关系

   **aop**:  对OOP(面向对象编程)进行增强，弥补OOP的不足。解决不同类中方法中重复代码的问题  ( 自定义注解+反射+动态代理)
		 
	

## Spring的优缺点是什么？

####   优点

1. 方便代码之间解耦，简化开发
2. 可以将所有对象的创建和依赖关系的维护，交给Spring容器管理。
3. AOP编程的支持,可以方便的实现对程序进行权限拦截、运行监控等功能。
4. 声明式事务的支持， 只需要通过配置就可以完成对事务的管理，而无需手动编程   @Transactional解决数据库隔离级别，数据库事务创建方式
5. 方便程序的测试
6. 集成其它主流的框架，简化其它主流框使用的难度

####   缺点：

​    学习底层的难度比较大的 （清楚为何这样做）
​	

## Spring 框架中都用到了哪些设计模式？

1. 工厂模式：BeanFactory就是简单工厂模式的体现，用来创建对象的实例；
2. ​单例模式：Bean默认为单例模式。
3. ​代理模式：Spring的AOP功能用到了JDK的动态代理和CGLIB字节码生成技术；
4. ​模板方法：用来解决代码重复的问题。比如. RestTemplate, JmsTemplate, JpaTemplate。
5. 观察者模式：定义对象键一种一对多的依赖关系，当一个对象的状态发生改变时，
   所有依赖于它的对象都会得到通知被制动更新，如Spring中listener的实现–ApplicationListener

## BeanFactory 和 ApplicationContext有什么区别？

1.    BeanFactory和ApplicationContext是Spring的两大核心接口，都可以当做Spring的容器。其中ApplicationContext是BeanFactory的子接口。
2.    BeanFactory：是Spring里面最底层的接口，包含了各种Bean的定义，读取bean配置文档，管理bean的加载、实例化，控制bean的生命周期， 维护bean之间的依赖关系。
3.    ApplicationContext接口作为BeanFactory的派生，还提供了更完整的框架功能：
       			1.继承MessageSource，因此支持国际化。
       			2.统一的资源文件访问方式。
       			3.提供在监听器中注册bean的事件。
      			 4.同时加载多个配置文件载入多个（有继承关系）上下文 ，使得每一个上下文都专注于一个特定的层次，比如应用的web层。

## 有哪些不同类型的依赖注入实现方式？

1. ​    依赖注入分为接口注入（Interface Injection）
2.    Setter方法注入（Setter Injection）
3. ​    构造器注入（Constructor Injection）三种方式

## Spring框架支持以下五种bean的作用域

1.   singleton : bean在每个Spring ioc 容器中只有一个实例。
2.   prototype：一个bean的定义可以有多个实例

#####   网页中使用(一般都不用)

1.   request：每次http请求都会创建一个bean，该作用域仅在基于web的SpringApplicationContext情形下有效。
2.   session：在一个HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的
3.   global-session：在一个全局的HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。

## Spring框架中的单例bean是线程安全的吗？

  **不是，Spring框架中的单例bean不是线程安全的**

### 什么是bean的自动装配？  自动装配的方式有哪几种？

#####    **帮你注入你需要的接口（对象）的实例**

```java
@Autowired
private MerchandiserService merchandiserService;
```

##### 在Spring框架xml配置中共有5种自动装配：

1.  no：默认的方式是不进行自动装配的，通过手工设置ref属性来进行装配bean。

   ```java
     <bean id="c01" class="com.hxzy.user.ClassRoom">
          <property name="xiaoZhang"  ref="u01"></property>
     </bean>
   ```

2.   byName：通过bean的名称进行自动装配

3.   byType：通过参数的数据类型进行自动装配。 (如果类型查找到了多少，就会报错)

4.   constructor：利用构造函数进行装配，并且构造函数的参数通过byType进行装配。

5.   autodetect：自动探测，如果有构造方法，通过 construct的方式自动装配，否则使用byType的方式自动装配。

## spring中常用的注解

```java
  @Component     //声明组件（交给容器管理）
  @Repository   //继承@Component，意思是告诉开发者这个一个数据访问的实现类
  @Service      //继承@Component，意思是告诉开发者这个一个业务逻辑的实现类
  @Controller   //承@Component，意思是告诉开发者这个一个Servlet的实现类
  @Configuration  //声明配文件
  @PostConstruct  //初始化操作
```

## Spring支持的事务管理类型， spring 事务实现方式有哪些？

1.  编程式事务管理：这意味你通过编程的方式管理事务，给你带来极大的灵活性，但是难维护。(不用的)     

2.   声明式事务管理：这意味着你可以将业务代码和事务管理分离，你只需用注解和XML配置来管理事务。

   ```java
   @Transactional(rollbackFor = Exception.class)
         public boolean updateData(MerchandiseDataDTO merchandiseDataDTO) {}
   ```

## 说一下Spring的事务传播行为

​    **必须要事务 ---->绝对不能出现事务**

```java
REQUIRED       //必须要有事务（如果没有，框架帮你创建事务，如果它发现有事务，加入到事务里面）

SUPPORTS       //支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就以非事务执行。

MANDATORY      //支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就抛出异常。

REQUIRES_NEW   //创建新事务，无论当前存不存在事务，都创建新事务
	  
NOT_SUPPORTED  //以非事务方式执行操作，如果当前存在事务，就把当前事务挂起(不执行)
 
NEVER         //以非事务方式执行，如果当前存在事务，则抛出异常

NESTED         //如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则按REQUIRED属性执行
```

##  spring 的事务隔离？

#####     什么是事务？

​	   在数据库中，为了完整一件事情，执行的sql操作。

##### 	   事务特性： ACID

1. 原子性:  事务要么全部成功，要么全部失败
2. 一致性:  事务一旦执行，结果就是我们所期望的结果
3. 隔离性:  A事务在执行的时候，B事务就要给我挂起（等待），直到A提交事务，B才能执行 (死锁，等多少秒后报超时)
4.  持久性:  事务一旦完成，就会永久保存

##### 		       数据有4个隔离级别：

|          | 脏读 | 不可重复读 | 幻读 |
| :------: | :--: | :--------: | :--: |
| 读未提交 |:heavy_check_mark:| :heavy_check_mark: |:heavy_check_mark:|
| 读已提交 |  :x:   | :heavy_check_mark:  |:heavy_check_mark: |
| 可重复读 |  :x:   |     :x:      | :heavy_check_mark: |
|  串行化  |  :x:   |    :x:      |  :x:   |

​            **mysql:   可重复读      oracle:  读已提交** 
​				 

######  脏读：  

表示一个事务能够读取另一个事务中还未提交的数据。

###### 	 不可重复读 ：

事务A        事务B 

       select  /  update  /  select    两次的结果不一致

######   幻读:

​事务A             事务B 	

        update  /  insert  /  select     有一/几笔数据没有被更新到





##   设计模式六大原则

    1.单一职责原则(Single Responsibility Principle)   SRP :
        接口一定要做到单一职责，类的设计尽量做到只有一个原因引起变化。
    2.里氏替换原则(Liskov Substitution Principle)    LSP :
        只要父类能出现的地方子类就可以出现，
        而且替换为子类也不会产生任何错误和异常，使用者根本不需要知道是父类还是子类。
        但是，反过来就不行，有子类的地方，父类未必就能适应。
    3.依赖倒置原则(Dependence Inversion Principle)  DIP :
        即面向接口编程，传值直接使用接口或者抽象类
    4.接口隔离原则(Interface Segregation Principle)  ISP :
        该原则就是将接口的职责细分，保证接口的纯洁性:	  	      
            1.接口尽量小(方法实现不能太复杂)
            2.接口要高内聚(提高接口、类、模块的处理能力，减少对外的交互。
            也就是你只用知道结果就好，不用管它是怎么实现的)
    5.迪米特尔法则(Law of Demeter Principle || 最少知道原则)  LDP:
        只和直接的朋友交流。陌生的类最好不用以局部变量的方式出现在类的内部，
        尽量少对外公布public方法和非静态的public变量，
        如果一个方法放在本类中，既不增加类间关系，也不对本类产生负面影响，那就放置在本类。(类间解耦，弱耦合)
    6.开闭原则(Open Closed Principle) OCP :
        对扩展开放，对修改关闭不要去更新原来的代码，应该再创建一个新的类来代替原来的那个类