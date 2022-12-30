package com.kotlinspringvue.backend.jpa

import javax.persistence.*

@Entity
@Table(name = "orders")
data class Order (

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long? = 0,

    @Column(name="price")
    var price: String?=null,

    @Column(name="description")
    var description: String?=null,

    @Column(name = "customer_full_name")
    var customerFullName: String? = null,

    @Column(name = "date")
    var date:String? = null,


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "users_orders",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "order_id", referencedColumnName = "id")]
    )
    var users: Collection<User>? = null
)