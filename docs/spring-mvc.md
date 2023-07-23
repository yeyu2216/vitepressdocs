# SpringMvc

## springmvc工作流程（原理，如何工作。。。。）

1. 用户发送请求
2. **核心类 ** DispatcherServlet,它是使用Servlet来实现的
3. **映射处理器 **  HandlerMapping  有点像Servlet 的 @WebServlet(urlPattern="/地址")
4. **HandlerInterceptor 拦截器**  像Servlet的Filter  (FilterChain过滤器链)
5. **Handler**    像Servlet的doGet()或doPost()的方法
6. **HandlerAdapter**  执行Handler方法的匹配器（收集参数、输出json格式、文件上传....）
7. **通过反射+动态代理**  执行Handler方法，返回 **ModelAndView** 模型和视图
8. **视图解析器**   ViewResolver (jsp，freemarker,thealmeaf、JSON、stream文件流.......)
9. **通过视图解析器把Model中的数据与view页面渲染**,生成html发给客户端


## springmvc常用注解以及函数

  **类上面**        

```java
  @Controller
  @RestController(@Controller+ @ResponseBody)
  @ReqeustMapping()
```

   **方法上面**   

```java
@ReqeustMapping() 
@PutMapping(insert) 
@GetMapping
@DeleteMapping  
@PostMapping(update)
@ResponseBody //(输出的结果变为json格式)
```

  **参数里面**    

```java
@RequestParam
    //请求参数名称，默认值 ，

   // 是否必须(可以不写的) RequestParamMethodArgumentResolver

@GetMapping(value = "/employee/account/exists")
    public R existsName(
            @RequestParam(value = "id") Long id,
            @RequestParam(value = "loginName") String loginName) {
    }
@PathVariable
    //路由表达式 PathVariableMethodArgumentResolver
    PathVariableMapMethodArgumentResolver
@GetMapping(value = "/employee/{id}")

public R findById(@PathVariable(value = "id") Long id) {}

@RequestBody  // 以json格式来接收参数 Map
    //自定义对象 绝对不能是GET请求   RequestParamMapMethodArgumentResolver
public R add(@RequestBody Employee employee) { }

public R changeState(@RequestBody java.util.Map<String, Object> data) {
	@RequestHeader(value = "Authorization") 取得请求头中的值 				     	          	request.getHeader("Authorization")
       RequestHeaderMethodArgumentResolver
       // MultipartFile 上传文件接收用 只允许使用POST
        @PostMapping("/upload")
        public R upload (MultipartFile file)
        @ResponseBody //输出数据变为json格式
    }
```


##  Filter和HandlerInterceptor的区别

1. Filter是基于函数回调的，而Interceptor则是基于Java反射的。
2. Filter依赖于Servlet容器，而Interceptor不依赖于Servlet容器。
3. Filter对几乎所有的请求起作用，而Interceptor只能对handler请求起作用。
4. Interceptor可以访问Action的上下文，值栈里的对象，而Filter不能。
5. Interceptor可以被多次调用，而Filter只能在容器初始化时调用一次。