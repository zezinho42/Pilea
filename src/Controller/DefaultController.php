<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\DataValue;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function homepageAction(Request $request)
    {
        $linky = $this
            ->getDoctrine()
            ->getRepository('App:Feed')
            ->findOneByFeedType('LINKY');
        if (!$linky) {
            return $this->render('pages/welcome.html.twig', [
                'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            ]);
        }

        return $this->render('dashboards/homepage.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/electricity", name="general")
     */
    public function electricityAction(Request $request)
    {
        return $this->render('dashboards/electricity.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/energy_x_meteo", name="energy_x_meteo")
     */
    public function energymeteoAction(Request $request)
    {
        return $this->render('dashboards/energy_x_meteo.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/meteo", name="meteo")
     */
    public function meteoAction(Request $request)
    {
        return $this->render('dashboards/meteo.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    public function periodAction()
    {
        $period = $this
            ->getDoctrine()
            ->getRepository('App:DataValue')
            ->getPeriodDataAmplitude();

        return $this->render('misc/period.html.twig', [
            'period' => $period[0],
        ]);
    }
}
