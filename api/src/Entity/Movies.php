<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Serializer\Filter\PropertyFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * This is a dummy entity. Remove it!
 */
#[ApiResource(mercure: true, paginationClientItemsPerPage: true)]
#[ApiResource(normalizationContext: ['groups' => ['movies:read']])]
#[ApiFilter(PropertyFilter::class)]
#[ApiFilter(OrderFilter::class, properties: ['title','rental','category.name'])]
#[ApiFilter(SearchFilter::class, properties: [
    "category.name"=>'partial',
])]
#[ORM\Entity]
class Movies
{
    /**
     * The entity ID
     */
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    private ?int $id = null;

    /**
     * A nice person
     */

    #[ORM\Column(length: 255,type:"string")]
    #[ApiFilter(SearchFilter::class, strategy: 'exact')]
    #[Groups("movies")]
    private ?string $title = null;

    #[ORM\Column(type:"float")]
    #[Groups("movies")]
    private ?float $rentalRate = null;

    #[ORM\Column(length: 255)]
    #[Groups("movies")]
    private ?string $rating = null;

    #[ORM\ManyToOne(inversedBy: 'movies')]
    #[ApiFilter(SearchFilter::class, strategy: 'exact')]
    // #[ApiFilter(PropertyFilter::class, arguments: ['parameterName' => 'foobar'])]
    #[Groups(["movies:read"])]
    private ?Category $category = null;

    #[ORM\Column]
    #[ApiFilter(SearchFilter::class, strategy: 'exact')]
    private ?float $rental = null;

    public function __construct()
    {
       
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getRentalRate(): ?float
    {
        return $this->rentalRate;
    }

    public function setRentalRate(float $rentalRate): self
    {
        $this->rentalRate = $rentalRate;

        return $this;
    }

    public function getRating(): ?string
    {
        return $this->rating;
    }

    public function setRating(string $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getRental(): ?float
    {
        return $this->rental;
    }

    public function setRental(float $rental): self
    {
        $this->rental = $rental;

        return $this;
    }
    public function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('create');
    }
}
