package com.kotlinspringvue.backend.repository

import com.kotlinspringvue.backend.jpa.Order
import com.kotlinspringvue.backend.jpa.Perfomance
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import java.util.*
import javax.transaction.Transactional

interface OrderRepository: JpaRepository<Order, Long> {
    fun findById(@Param("id") username: String): Optional<Order>

    fun findByDate(@Param("date") username: String): Optional<Order>

    fun findByCustomerFullName(@Param ("customerFullName") customerFullName: String) : Optional<Order>

    fun findByCustomerEmail(@Param("customerEmail")customerEmail : String) : List <Order>

    @Transactional
    fun deleteByCustomerFullName(@Param("customerFullName") username: String)


}