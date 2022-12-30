package com.kotlinspringvue.backend.controller

import com.kotlinspringvue.backend.jpa.Order
import com.kotlinspringvue.backend.jpa.Perfomance
import com.kotlinspringvue.backend.model.NewOrder
import com.kotlinspringvue.backend.model.NewPerfomance
import com.kotlinspringvue.backend.repository.OrderRepository
import com.kotlinspringvue.backend.repository.UserRepository
import com.kotlinspringvue.backend.web.response.ResponseMessage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.validation.Valid


@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
class OrderController {

    @Autowired
    lateinit var orderRepository: OrderRepository

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/allOrders")
    fun getOrders() = orderRepository.findAll()

    @PostMapping("/add")
    fun addNewOrder(@Valid @RequestBody newOrder: NewOrder): ResponseEntity<*> {

        //создаем новый заказ и записываем в бд
        val order = Order(
            0,
            newOrder.price!!,
            newOrder.description!!,
            newOrder.customerFulLName!!,
            newOrder.date!!
        )
        orderRepository.save(order)

        return ResponseEntity(ResponseMessage("Order added"),HttpStatus.OK)
    }

}